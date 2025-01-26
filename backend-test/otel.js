const { NodeSDK } = require('@opentelemetry/sdk-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { MySQL2Instrumentation } = require('@opentelemetry/instrumentation-mysql2'); // Correct Import

// Prometheus Exporter configuration
const prometheusExporter = new PrometheusExporter({
  startServer: true,
  port: 9464, // Prometheus scraping will happen here
}, () => {
  console.log('Prometheus metrics exposed at http://localhost:9464/metrics');
});

// Initialize OpenTelemetry SDK with the Prometheus exporter and required instrumentations
const sdk = new NodeSDK({
  traceExporter: prometheusExporter,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new MySQL2Instrumentation() // Use MySQL2 instrumentation for compatibility
  ],
});

sdk.start()
  .then(() => {
    console.log('✅ OpenTelemetry is running...');
  })
  .catch((err) => {
    console.error('❌ Error starting OpenTelemetry:', err);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('✅ Tracing terminated'))
    .catch((error) => console.error('❌ Error shutting down tracing:', error))
    .finally(() => process.exit(0));
});
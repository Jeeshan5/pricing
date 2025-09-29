class RequestLogger {
  static log(req, version, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      version,
      path: req.path,
      ...metadata
    };
    console.log('📝', JSON.stringify(logEntry));
  }
}

module.exports = RequestLogger;
class HttpStatus {
  public static CONTINUE = 100;
  public static SWITCHING_PROTOCOLS = 101;
  public static OK = 200;
  public static CREATED = 201;
  public static ACCEPTED = 202;
  public static O_CONTENT = 204;
  public static MOVED_PERMANENTLY = 301;
  public static FOUND = 302;
  public static SEE_OTHER = 303;
  public static NOT_MODIFIED = 304;
  public static BAD_REQUEST = 400;
  public static UNAUTHORIZED = 401;
  public static FORBIDDEN = 403;
  public static NOT_FOUND = 404;
  public static METHOD_NOT_ALLOWED = 405;
  public static CONFLICT = 409;
  public static UNPROCESSABLE_CONTENT = 422;
  public static INTERNAL_SERVER_ERROR = 500;
  public static NOT_IMPLEMENTED = 501;
  public static BAD_GATEWAY = 502;
  public static SERVICE_UNAVAILABLE = 503;
}

export default HttpStatus;

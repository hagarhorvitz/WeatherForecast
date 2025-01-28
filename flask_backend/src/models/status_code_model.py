from enum import Enum

class StatusCode(Enum):
    OK = 200 ## The request was successful.
    Created = 201 ## The request was successful and a new resource was created.
    BadRequest = 400 ## The server could not understand the request due to invalid syntax.
    Unauthorized = 401 ## Authentication is required and has failed or has not yet been provided.
    Forbidden = 403 ## The client does not have access rights to the content.
    NotFound = 404 ## The server can not find the requested resource.
    InternalServerError = 500 ## The server has encountered a situation it doesn't know how to handle.
    NotImplemented = 501 ## The server does not support the functionality required to fulfill the request.
    BadGateway = 502 ## The server received an invalid response from the upstream server.
    MethodNotAllowed = 405 ## The request method is not supported for the requested resource.


# 1xx: Informational
# 100 Continue: The initial part of a request has been received and the client should continue.
# 101 Switching Protocols: The server is switching protocols as requested by the client.

# 2xx: Success
# 200 OK: The request was successful.
# 201 Created: The request was successful and a new resource was created.
# 202 Accepted: The request has been accepted for processing, but processing is not complete.
# 204 No Content: The server successfully processed the request, but there is no content to return.

# 3xx: Redirection
# 301 Moved Permanently: The resource has been moved to a new URL permanently.
# 302 Found: The resource is temporarily available at a different URL.
# 304 Not Modified: The resource has not been modified since the last request.

# 4xx: Client Errors
# 400 Bad Request: The server could not understand the request due to invalid syntax.
# 401 Unauthorized: Authentication is required and has failed or has not yet been provided.
# 403 Forbidden: The client does not have access rights to the content.
# 404 Not Found: The server can not find the requested resource.
# 405 Method Not Allowed: The request method is not supported for the requested resource.
# 409 Conflict: The request could not be processed because of a conflict.

# 5xx: Server Errors
# 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
# 501 Not Implemented: The server does not support the functionality required to fulfill the request.
# 502 Bad Gateway: The server received an invalid response from the upstream server.
# 503 Service Unavailable: The server is not ready to handle the request, usually due to maintenance or overload.
# 504 Gateway Timeout: The server was acting as a gateway and did not receive a timely response from the upstream server.
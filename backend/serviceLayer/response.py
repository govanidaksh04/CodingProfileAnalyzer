from fastapi.responses import JSONResponse

def error_response(status_code : int, error_type : str, error_data : str) -> JSONResponse:
    return {
            "status_code" : status_code,
            "content" : {
                "success": False,
                "data": None,
                "error": {
                    "type": error_type,
                    "message": error_data
                }
            }
        }

def success_response(res_data: JSONResponse):
    return {
        "success": True,
        "data": res_data,
        "error": None
    }
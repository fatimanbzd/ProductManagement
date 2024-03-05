public class ApiResponse<T> : BaseResponse
{
    public T Result { get; set; }

    public ApiResponse(T data)
    {
        Result = data;
    }

    public ApiResponse()
    {
    }
}

public class ApiResponse : BaseResponse
{
    public ApiResponse() { }
}

public abstract class BaseResponse
{
    public bool IsSuccess { get; set; }
    public List<string>? ErrorMessages { get; set; }
}
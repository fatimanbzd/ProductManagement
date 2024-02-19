public class ApiResponse<T> : BaseResponse
{
    public T Result { get; set; }

    public ApiResponse(T data)
    {
        Result = data;
    }
}

public class ApiResponse : BaseResponse
{
    public ApiResponse() { }
}

public abstract class BaseResponse
{
    public bool Success { get; set; }
    public List<string>? ErrorMessages { get; set; }
}
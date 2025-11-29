import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class CommonFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // 记录请求信息
    console.log('========== CommonFilter 捕获到异常 ==========');
    console.log('请求 URL:', request.url);
    console.log('请求方法:', request.method);
    console.log('请求路径:', request.path);
    console.log('请求 Query 参数:', JSON.stringify(request.query, null, 2));
    console.log('请求 Body:', JSON.stringify(request.body, null, 2));
    console.log('请求 Headers:', JSON.stringify(request.headers, null, 2));
    console.log('异常类型:', exception.constructor.name);
    console.log('异常消息:', exception.message);
    console.log('异常堆栈:', exception.stack);
    console.log('===========================================');

    const res =
      exception instanceof HttpException
        ? (exception.getResponse() as any)
        : exception;

    const code = exception.getStatus?.() || (exception as any).code || 500;

    const errorResponse = {
      success: false,
      message: res.message?.join
        ? res.message.join(', ')
        : res.message || exception.message,
      code,
    };

    response.status(200).json(errorResponse);
  }
}

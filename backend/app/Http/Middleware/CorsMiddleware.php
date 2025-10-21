<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request and set CORS headers.
     */
    public function handle(Request $request, Closure $next)
    {
        // Handle preflight (OPTIONS) requests
        if ($request->isMethod('OPTIONS')) {
            $headers = [
                'Access-Control-Allow-Origin' => $request->headers->get('Origin') ?? '*',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Allow-Credentials' => 'true',
            ];

            return Response::make('', 200, $headers);
        }

        // For normal requests
        $response = $next($request);

        $origin = $request->headers->get('Origin') ?? '*';

        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}

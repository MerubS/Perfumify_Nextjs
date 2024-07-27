
import { NextResponse } from 'next/server';
export const corsHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  

export const jsonResponse = (data, status) => {
  return NextResponse.json(data, {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};

export const handleError = (error, message, status) => {
  console.error(message, error);
  return jsonResponse({ error: message }, status);
};

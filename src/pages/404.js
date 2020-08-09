import React from "react";
import "twin.macro";

function ErrorPage() {
  return (
    <main tw="min-h-screen bg-indigo-900">
      <div tw="relative py-16 overflow-hidden">
        <div tw="relative px-4 sm:px-6 lg:px-8">
          <div tw="text-lg max-w-prose mx-auto mb-6">
            <p tw="text-base text-center leading-6 text-indigo-300 font-semibold tracking-wide uppercase">
              NOT FOUND
            </p>
            <h1 tw="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-indigo-100 sm:text-4xl sm:leading-10">
              You are lost, friend
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;

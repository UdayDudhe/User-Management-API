import React from 'react'

function ServerErrorPage() {
  return (
    <>
      <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">503</h1>
                <p class="fs-3"> <span class="text-danger">Opps! </span>Server is Not Availabe</p>
                <p class="lead">
                HTTP 503 Server has been shutdown
                  </p>
                <a href="/" class="btn btn-primary">Go Home</a>
            </div>
        </div>
    </>
  )
}

export default ServerErrorPage
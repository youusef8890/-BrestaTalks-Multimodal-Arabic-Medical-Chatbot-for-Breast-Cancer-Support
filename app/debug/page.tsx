"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface TestResult {
  status: "success" | "error" | "loading"
  message: string
  details?: any
}

export default function DebugPage() {
  const [backendTest, setBackendTest] = useState<TestResult>({ status: "loading", message: "Testing..." })
  const [apiTest, setApiTest] = useState<TestResult>({ status: "loading", message: "Testing..." })

  const testBackendConnection = async () => {
    setBackendTest({ status: "loading", message: "Testing backend connection..." })

    try {
      const response = await fetch("/api/test-backend")
      const data = await response.json()

      if (data.status === "success") {
        setBackendTest({
          status: "success",
          message: "Backend connection successful",
          details: data,
        })
      } else {
        setBackendTest({
          status: "error",
          message: `Backend connection failed: ${data.error || "Unknown error"}`,
          details: data,
        })
      }
    } catch (error) {
      setBackendTest({
        status: "error",
        message: `Failed to test backend: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: error,
      })
    }
  }

  const testChatAPI = async () => {
    setApiTest({ status: "loading", message: "Testing chat API..." })

    try {
      const formData = new FormData()
      formData.append("question", "test message")

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setApiTest({
          status: "success",
          message: "Chat API working correctly",
          details: data,
        })
      } else {
        const errorText = await response.text()
        setApiTest({
          status: "error",
          message: `Chat API failed: ${response.status} - ${errorText}`,
          details: { status: response.status, error: errorText },
        })
      }
    } catch (error) {
      setApiTest({
        status: "error",
        message: `Failed to test chat API: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: error,
      })
    }
  }

  useEffect(() => {
    testBackendConnection()
    testChatAPI()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "loading":
        return <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Debug Dashboard</h1>
          <p className="text-gray-600">Test your backend connection and API endpoints</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(backendTest.status)}
                <span>Backend Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{backendTest.message}</p>
              <Button onClick={testBackendConnection} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Test
              </Button>
              {backendTest.details && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600">View Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(backendTest.details, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(apiTest.status)}
                <span>Chat API</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{apiTest.message}</p>
              <Button onClick={testChatAPI} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Test
              </Button>
              {apiTest.details && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600">View Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(apiTest.details, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Backend URL:</span>
                <span className="text-sm text-gray-600">{process.env.NEXT_PUBLIC_BACKEND_URL || "Not configured"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Environment:</span>
                <span className="text-sm text-gray-600">{process.env.NODE_ENV || "development"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button onClick={() => (window.location.href = "/chat")} className="bg-pink-500 hover:bg-pink-600">
            Go to Chat
          </Button>
        </div>
      </div>
    </div>
  )
}

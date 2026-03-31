"use client";

import { useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { Copy, Download, RefreshCw } from "lucide-react";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const QRCodeComponent = dynamic(() => import("qrcode.react").then(mod => ({ default: mod.QRCodeSVG })), {
  ssr: false,
  loading: () => <div className="w-80 h-80 bg-gray-700 rounded-xl animate-pulse" />,
});

export default function QRCodeGenerator() {
  const [qrValue, setQrValue] = useState("https://himanshurana.dev");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQrValue(e.target.value || "");
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${Date.now()}.png`;
      link.click();
    }
  };

  const handleCopyToClipboard = async () => {
    const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      try {
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleClear = () => {
    setQrValue("");
  };

  return (
    <div className="relative overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-20">
        {/* Animated background blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />
          <div className="absolute bottom-32 left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-5 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
              QR Code Generator
            </h1>
            <p className="text-lg text-gray-400">
              Convert any text or link into a beautiful QR code instantly
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Input Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
                <label className="block text-sm font-semibold text-purple-300 mb-3">
                  Enter Text or Link
                </label>
                <textarea
                  value={qrValue}
                  onChange={handleInputChange}
                  placeholder="Paste your link, phone number, email, or any text here..."
                  className="w-full h-40 bg-black/50 border border-purple-400/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 resize-none transition-all duration-300"
                />

                {/* Character count */}
                <div className="mt-2 text-xs text-gray-400 flex justify-between">
                  <span>{qrValue.length} characters</span>
                  <span className={qrValue.length > 2953 ? "text-red-400" : ""}>
                    Max: 2953 characters
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <button
                    onClick={handleDownload}
                    disabled={!qrValue}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  <button
                    onClick={handleCopyToClipboard}
                    disabled={!qrValue}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <Copy size={18} />
                    <span className="hidden sm:inline">
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={!qrValue}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/50"
                  >
                    <RefreshCw size={18} />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </div>

                {/* Information */}
                <div className="mt-8 p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
                  <p className="text-sm text-gray-300">
                    💡 <span className="font-semibold">Tip:</span> QR codes can
                    contain URLs, email addresses, phone numbers, wifi
                    credentials, vCard data, and more!
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Display Section */}
            <div className="flex flex-col justify-center items-center">
              {qrValue ? (
                <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-2xl p-12 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
                  <div
                    ref={qrRef}
                    className="bg-white p-6 rounded-xl shadow-2xl shadow-purple-500/30"
                  >
                    <Suspense fallback={<div className="w-80 h-80 bg-gray-200 rounded-lg" />}>
                      <QRCodeComponent
                        value={qrValue}
                        size={300}
                        level="H"
                        includeMargin={true}
                        fgColor="#8f00ff"
                        bgColor="#ffffff"
                      />
                    </Suspense>
                  </div>

                  {/* QR Code Info */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      Scan this code with any QR code reader
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        High Error Correction
                      </span>
                      <span className="px-3 py-1 bg-purple-900/50 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        300×300px
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/20 rounded-2xl p-12 backdrop-blur-xl w-full max-w-sm aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-30">📱</div>
                    <p className="text-gray-400 text-sm">
                      Enter text or a link to generate your QR code
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-1">Instant Generation</h3>
              <p className="text-sm text-gray-400">
                Real-time QR code generation as you type
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-2xl mb-2">📥</div>
              <h3 className="font-semibold text-white mb-1">Easy Download</h3>
              <p className="text-sm text-gray-400">
                Save QR codes as PNG images for sharing
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-white mb-1">Reliable Scannable</h3>
              <p className="text-sm text-gray-400">
                High error correction for reliable scanning
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

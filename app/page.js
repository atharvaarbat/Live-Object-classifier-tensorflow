'use client'
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
            <header className="w-full p-6 bg-white shadow-md">
                <nav className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800">Object Classifier</div>
                    <Link href="/object-classifier">
                        <p className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Get Started</p>
                    </Link>
                </nav>
            </header>
            <main className="flex flex-1 flex-col items-center justify-center text-center p-4">
                <h1 className="text-5xl font-bold mb-6">Welcome to the Object Classifier</h1>
                <p className="text-lg mb-6">Detect and classify objects in real-time using your webcam. Built with TensorFlow.js and COCO-SSD model.</p>
                {/* <Link href="/home">
                    <a className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600">Start Detecting</a>
                </Link> */}
            </main>
            <footer className="w-full p-6 bg-white shadow-md text-center">
                <p>Made with ❤️ by Atharva Arbat</p>
            </footer>
        </div>
    );
}

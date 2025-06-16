import { Loader2 } from 'lucide-react';
import Navbar from './component/Navbar';

export default function Loading() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900">
      <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
      <p className="text-gray-300">Loading data...</p>
    </div>
    </>
  );
}
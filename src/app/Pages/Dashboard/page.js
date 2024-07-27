"use client"
import { useAuth } from "@/app/contexts/authProvide";
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { authState } = useAuth();
  const router = useRouter();

  if (!authState) {
    router.push('/Pages/UserAuthentication/LoginPage');
    return null;
  }

  return (
    <div className="flex flex-col bg-secondary min-h-screen">
      <h1 className="font-bold text-lg text-gray-700">Dashboard</h1>
      <p className="font-bold text-lg text-gray-700">Welcome to the protected dashboard page!</p>
    </div>
  );
};

export default DashboardPage;

import Image from 'next/image';

export default function LoginLeftPanel() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-8 bg-background overflow-hidden">
      <div className="relative w-full flex items-center justify-center" style={{ maxWidth: '617px', maxHeight: '411px' }}>
        <Image
          src="/login.svg"
          alt="Login Illustration"
          width={617}
          height={411}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

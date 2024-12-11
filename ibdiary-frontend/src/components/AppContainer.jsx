export default function AppContainer({ children }) {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 justify-center items-center p-6">
      {children}
    </div>
  );
}

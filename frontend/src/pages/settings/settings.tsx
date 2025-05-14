import { BasicInfo } from './basic-info';

export function Settings() {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Settings</h1>

      <BasicInfo />
    </div>
  );
}

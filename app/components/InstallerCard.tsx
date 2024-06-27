import {Link} from './Link';

export default function InstallerCard({installer}: {installer: Installer}) {
  return (
    <div
      className={`w-full flex, flex-col p-[20px] mb-[20px] rounded-[10px] border-2 hover:border-[#F26500] border-[#D0D0D0]`}
    >
      <p className="font-bold">{installer.name}</p>
      <div>
        <p className="!mb-0">Contact Details:</p>
        <p className="!mb-0">{installer.phone}</p>
        {installer.email && <p className="!mb-0">{installer.email}</p>}
        {installer.website && (
          <a href={installer.website} target="_blank" rel="noreferrer">
            {installer.website}
          </a>
        )}
      </div>
    </div>
  );
}
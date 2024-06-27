import {IconClose, Link} from '~/components';

export function Modal({
  children,
  cancelLink,
  close,
}: {
  children: React.ReactNode;
  cancelLink: string;
  close: () => void;
}) {
  return (
    <div
      className="relative z-50 huupeModal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className="relative flex-1 px-4 pt-12 pb-4 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:flex-none sm:w-full sm:p-6 sm:pt-12"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
            }} 
            onKeyPress={(e) => {
              e.stopPropagation();
            }}
            tabIndex={0}
          >
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <Link
                to="#"
                className="p-4 -m-4 transition text-primary hover:text-primary/50"
                onClick={(e) => { e.preventDefault(); close(); }}
              >
                <IconClose aria-label="Close panel" />
              </Link>
            </div>
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}

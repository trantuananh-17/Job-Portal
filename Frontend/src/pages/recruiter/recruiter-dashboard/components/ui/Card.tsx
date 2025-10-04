interface Props {
  className: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

const Card: React.FC<Props> = ({ className, children, title, headerAction, subtitle }) => {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {(title || headerAction) && (
        <div className='flex items-center justify-between p-6 pb-4'>
          <div className=''>
            {title && <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>}
            {subtitle && <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      )}
      <div className={title ? 'px-6 pb-6' : 'p-6'}>{children}</div>
    </div>
  );
};

export default Card;

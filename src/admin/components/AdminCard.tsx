interface AdminCardProps {
  title?: string;
  children: React.ReactNode;
}

export default function AdminCard({ title, children }: AdminCardProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      marginBottom: '24px',
    }}>
      {title && (
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-black)',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border)',
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

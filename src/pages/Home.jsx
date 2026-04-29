import { Link } from 'react-router-dom'

export default function Home() {
  const apps = [
    {
      path: '/ticket-to-ride',
      name: '🎟️ Ticket to Ride',
      description: 'Score tracker for Ticket to Ride board game',
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5EFE6',
      backgroundImage: 'radial-gradient(circle at 20% 10%, #e8d5b7 0%, transparent 50%), radial-gradient(circle at 80% 90%, #dbb887 0%, transparent 40%)',
      fontFamily: "'Georgia', serif",
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 60,
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 48,
            fontWeight: 900,
            margin: '0 0 12px 0',
            letterSpacing: -1,
          }}>
            Game Apps
          </h1>
          <p style={{
            fontSize: 16,
            opacity: 0.7,
            margin: 0,
          }}>
            Pick a game to get started
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {apps.map((app) => (
            <Link
              key={app.path}
              to={app.path}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#fff',
                border: '3px solid #333',
                borderRadius: 16,
                padding: '24px',
                boxShadow: '4px 4px 0 #333',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)'
                e.currentTarget.style.boxShadow = '6px 6px 0 #333'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)'
                e.currentTarget.style.boxShadow = '4px 4px 0 #333'
              }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 900,
                    marginBottom: 4,
                  }}>
                    {app.name}
                  </div>
                  <div style={{
                    fontSize: 14,
                    opacity: 0.6,
                  }}>
                    {app.description}
                  </div>
                </div>
                <div style={{ fontSize: 28, flexShrink: 0 }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

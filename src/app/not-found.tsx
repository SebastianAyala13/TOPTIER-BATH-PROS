import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{padding:'80px 24px', textAlign:'center'}}>
      <h1>Página no encontrada</h1>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link href="/" style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        backgroundColor: '#14b8a6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Ir al inicio
      </Link>
    </main>
  );
}

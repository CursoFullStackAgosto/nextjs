import Head from "next/head";

export default function Layout({ children, title = 'Sistema de Parqueadero'}) {
  return (
    <div className="min-h-screen bg-gray-50" >
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema de gestión de parqueadero" />
        <meta name="viewport" content="width=device-width, initial-scale-1.0" />
      </Head>
      <main className="min-h-screen">
        {children}
      </main>
      <footer>

      </footer>
    </div>
  )
}
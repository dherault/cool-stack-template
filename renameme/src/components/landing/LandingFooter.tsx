import { Link } from 'react-router-dom'

function LandingFooter() {
  return (
    <footer className="pt-16 pb-8 container max-w-2xl flex items-start gap-4 text-neutral-800 text-xs md:text-base">
      <div>
        © David Hérault
        {' '}
        {new Date().getFullYear()}
      </div>
      <div className="-ml-4 grow" />
      <div className="space-y-2">
        <Link
          to="/"
          className="block text-blue font-medium"
        >
          Home
        </Link>
        <a
          href="https://blog.herostrategy.com"
          target="_blank"
          rel="noreferrer noopener"
          className="block text-blue font-medium"
        >
          Blog
        </a>
        <Link
          to="/legal"
          className="block text-blue font-medium"
        >
          Privacy policy and terms
        </Link>
      </div>
    </footer>
  )
}

export default LandingFooter

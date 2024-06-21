import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '~components/ui/Button'

function LandingHero() {
  return (
    <div className="h-[calc(100vh-73px)] shrink-0 flex">
      <div className="md:-mt-16 grow flex items-center justify-center gap-8">
        <div className="max-auto max-w-2xl flex">
          <div>
            <h2 className="text-6xl font-bold">
              Where great
              <br />
              Business Plans
              <br />
              are crafted
            </h2>
            <div className="mt-8">
              <Link to="/~/projects">
                <Button size="lg">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[calc(50%-32px)] aspect-video bg-neutral-100 rounded-xl flex items-center justify-center cursor-pointer">
          <Play className="w-16 h-16 text-neutral-800" />
        </div>
      </div>
    </div>
  )
}

export default LandingHero

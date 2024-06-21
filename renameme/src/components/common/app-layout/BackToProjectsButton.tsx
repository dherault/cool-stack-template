import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '~components/ui/Button'

function BackToProjectsButton() {
  return (
    <Link to="/~/projects">
      <Button variant="ghost">
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to projects
      </Button>
    </Link>
  )
}

export default BackToProjectsButton

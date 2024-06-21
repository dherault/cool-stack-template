// ! Do not edit this file directly, use npm run router instead
import { Outlet, Route, Routes } from 'react-router-dom'

import PricingLayout from '~app/pricing.../layout'
import Pricing from '~app/pricing.../page'

import NotFound from '~components/common/NotFound'

function PricingSubRouter() {
  return (
    <Routes>
      <Route
        path=""
        element={<PricingLayout><Outlet /></PricingLayout>}
      >
        <Route
          index
          element={<Pricing />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  )
}

export default PricingSubRouter
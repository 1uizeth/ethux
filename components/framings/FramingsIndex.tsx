import { OPPORTUNITY_AREAS } from '@/data/framings'
import { AreaSection } from './AreaSection'

export function FramingsIndex() {
  return (
    <div className="space-y-16">
      {OPPORTUNITY_AREAS.map((area, i) => (
        <AreaSection key={area.id} area={area} index={i} />
      ))}
    </div>
  )
}

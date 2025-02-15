import type { Optional } from '@/types/global'
import type BasePayload from './BasePayload'

export default interface PeerLogPayload extends BasePayload {
  // Exclude messages with "message id" <= last_known_id (default: -1)
  last_known_id: Optional<number>
}

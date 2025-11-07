// Barrel export for custom hooks
// Following modular programming best practices

export { useAuth } from './useAuth'
export {
  useFirestoreDocument,
  useFirestoreCollection,
  useFirestoreQuery,
  useFirestoreMutations,
} from './useFirestore'
export {
  useStorage,
  useAvatarUpload,
  useProductImageUpload,
} from './useStorage'

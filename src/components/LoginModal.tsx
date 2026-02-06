import React, { useState } from 'react'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (username: string) => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      onSuccess(data.user.inGameName)
      setUsername('')
      onClose()
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            In-Game Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your in-game name"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Don't have an account linked? Use <span className="text-primary-400 font-mono">/link</span> in-game first.
        </p>
      </form>
    </Modal>
  )
}

export default LoginModal

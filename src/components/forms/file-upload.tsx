'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/badge'

interface FileUploadProps {
  label?: string
  accept?: string
  maxSizeMB?: number
  status?: 'pending' | 'approved' | 'rejected' | null
  currentFile?: string
  onFileSelect: (file: File) => void
  onRemove?: () => void
  className?: string
}

export function FileUpload({
  label,
  accept = 'image/*,.pdf',
  maxSizeMB = 5,
  status,
  currentFile,
  onFileSelect,
  onRemove,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo: ${maxSizeMB}MB`)
      return
    }
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const statusConfig = {
    pending: { label: 'Pendente', variant: 'warning' as const, icon: AlertCircle },
    approved: { label: 'Aprovado', variant: 'success' as const, icon: CheckCircle },
    rejected: { label: 'Rejeitado', variant: 'danger' as const, icon: AlertCircle },
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">{label}</label>
          {status && (
            <Badge variant={statusConfig[status].variant}>
              {statusConfig[status].label}
            </Badge>
          )}
        </div>
      )}

      {selectedFile || currentFile ? (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-gray-50 p-3">
          <FileText className="h-8 w-8 text-primary-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {selectedFile?.name || currentFile}
            </p>
            {selectedFile && (
              <p className="text-xs text-foreground-muted">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null)
                onRemove()
              }}
              className="rounded-lg p-1 text-foreground-muted hover:text-danger-600 hover:bg-danger-50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer',
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-border hover:border-primary-300 hover:bg-gray-50'
          )}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-foreground-muted mb-2" />
          <p className="text-sm font-medium text-foreground">
            Arraste um arquivo ou clique para selecionar
          </p>
          <p className="mt-1 text-xs text-foreground-muted">
            Máximo {maxSizeMB}MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
    </div>
  )
}

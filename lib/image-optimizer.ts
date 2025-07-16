// Advanced image optimization utilities
export class ImageOptimizer {
  private static canvas: HTMLCanvasElement | null = null
  private static ctx: CanvasRenderingContext2D | null = null

  private static getCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")!
    }
    return { canvas: this.canvas, ctx: this.ctx! }
  }

  // Convert image to WebP format for smaller size
  static async convertToWebP(file: File, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const { canvas, ctx } = this.getCanvas()
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              })
              resolve(webpFile)
            } else {
              resolve(file) // Keep original if WebP is not smaller
            }
          },
          "image/webp",
          quality,
        )
      }
      img.onerror = () => resolve(file)
      img.src = URL.createObjectURL(file)
    })
  }

  // Smart resize based on image content
  static async smartResize(file: File, maxSize = 800): Promise<File> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const { canvas, ctx } = this.getCanvas()

        // Calculate optimal dimensions
        let { width, height } = img
        const aspectRatio = width / height

        // Smart sizing based on aspect ratio
        if (width > height) {
          if (width > maxSize) {
            width = maxSize
            height = maxSize / aspectRatio
          }
        } else {
          if (height > maxSize) {
            height = maxSize
            width = maxSize * aspectRatio
          }
        }

        // Ensure dimensions are even numbers for better compression
        width = Math.floor(width / 2) * 2
        height = Math.floor(height / 2) * 2

        canvas.width = width
        canvas.height = height

        // Use better image smoothing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(img, 0, 0, width, height)

        // Determine optimal quality based on image complexity
        const imageData = ctx.getImageData(0, 0, width, height)
        const complexity = this.calculateImageComplexity(imageData)
        const quality = complexity > 0.7 ? 0.85 : 0.75 // Higher quality for complex images

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              resolve(optimizedFile)
            } else {
              resolve(file)
            }
          },
          "image/jpeg",
          quality,
        )
      }
      img.onerror = () => resolve(file)
      img.src = URL.createObjectURL(file)
    })
  }

  // Calculate image complexity for optimal compression
  private static calculateImageComplexity(imageData: ImageData): number {
    const data = imageData.data
    let totalVariation = 0
    const sampleSize = Math.min(1000, data.length / 4) // Sample pixels for performance

    for (let i = 0; i < sampleSize * 4; i += 16) {
      // Sample every 4th pixel
      const r1 = data[i]
      const g1 = data[i + 1]
      const b1 = data[i + 2]
      const r2 = data[i + 4] || r1
      const g2 = data[i + 5] || g1
      const b2 = data[i + 6] || b1

      totalVariation += Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
    }

    return Math.min(totalVariation / (sampleSize * 255 * 3), 1)
  }

  // Generate thumbnail for quick preview
  static async generateThumbnail(file: File, size = 150): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const { canvas, ctx } = this.getCanvas()
        const scale = Math.min(size / img.width, size / img.height)
        const width = img.width * scale
        const height = img.height * scale

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        resolve(canvas.toDataURL("image/jpeg", 0.7))
      }
      img.onerror = () => resolve("")
      img.src = URL.createObjectURL(file)
    })
  }

  // Comprehensive optimization pipeline
  static async optimizeImage(file: File): Promise<{ optimized: File; thumbnail: string; stats: any }> {
    console.log("Starting image optimization pipeline...")
    const startTime = Date.now()

    try {
      // Step 1: Generate thumbnail immediately
      const thumbnail = await this.generateThumbnail(file, 150)

      // Step 2: Smart resize
      const resized = await this.smartResize(file, 800)
      console.log("Resized:", { original: file.size, resized: resized.size })

      // Step 3: Convert to WebP if beneficial
      const webpOptimized = await this.convertToWebP(resized, 0.8)
      console.log("WebP conversion:", { before: resized.size, after: webpOptimized.size })

      // Step 4: Final optimization if still too large
      let finalOptimized = webpOptimized
      if (webpOptimized.size > 500 * 1024) {
        // If still > 500KB, apply more aggressive compression
        finalOptimized = await this.smartResize(webpOptimized, 600)
      }

      const processingTime = Date.now() - startTime
      const compressionRatio = ((file.size - finalOptimized.size) / file.size) * 100

      const stats = {
        originalSize: file.size,
        optimizedSize: finalOptimized.size,
        compressionRatio: compressionRatio.toFixed(1),
        processingTime,
        format: finalOptimized.type,
      }

      console.log("Image optimization completed:", stats)

      return {
        optimized: finalOptimized,
        thumbnail,
        stats,
      }
    } catch (error) {
      console.error("Image optimization failed:", error)
      const thumbnail = await this.generateThumbnail(file, 150)
      return {
        optimized: file,
        thumbnail,
        stats: { error: "Optimization failed" },
      }
    }
  }
}

import {
	Injectable,
	signal,
	computed,
	effect,
	PLATFORM_ID,
	inject
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

declare const window: Window &
	typeof globalThis & {
		__THEME_STATE__?: {
			theme: Theme
			isDark: boolean
			timestamp: number
		}
	}
declare const localStorage: Storage
declare const document: Document
declare const setTimeout: typeof globalThis.setTimeout

export type Theme = 'light' | 'dark' | 'system'

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)
	private readonly _theme = signal<Theme>(this.getInitialTheme())
	private readonly _isDarkOverride = signal<boolean | null>(null)
	private readonly _isHydrated = signal(false)
	private hydrated = false

	readonly theme = this._theme.asReadonly()
	readonly isHydrated = this._isHydrated.asReadonly()

	readonly isDark = computed(() => {
		if (!this.isBrowser) {
			return false
		}

		const override = this._isDarkOverride()
		if (override !== null && !this.hydrated) {
			return override
		}

		const theme = this._theme()
		if (theme === 'system') {
			const matches = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
			return matches
		}
		const result = theme === 'dark'
		return result
	})

	constructor() {
		if (this.isBrowser) {
			this.checkPreInitializedState()
			this.setupSystemPreferenceListener()
			this.handleHydration()
		}

		effect(() => {
			this.applyTheme()
		})
	}

	setTheme(theme: Theme): void {
		this._theme.set(theme)
		this._isDarkOverride.set(null)
		this.saveTheme(theme)
	}

	toggleTheme(): void {
		if (!this.isBrowser) {
			return
		}

		const currentTheme = this._theme()

		if (currentTheme === 'light') {
			this.setTheme('dark')
		} else if (currentTheme === 'dark') {
			this.setTheme('light')
		} else {
			const systemIsDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
			this.setTheme(systemIsDark ? 'light' : 'dark')
		}
	}

	private checkPreInitializedState(): void {
		if (window?.__THEME_STATE__) {
			const state = window.__THEME_STATE__

			this._theme.set(state.theme)
			this._isDarkOverride.set(state.isDark)

			delete window.__THEME_STATE__
		}
	}

	private setupSystemPreferenceListener(): void {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', e => {
				if (this._theme() === 'system') {
					this.applyTheme()
				}
			})
	}

	private handleHydration(): void {
		setTimeout(() => {
			this.hydrated = true
			this._isHydrated.set(true)

			setTimeout(() => {
				this._isDarkOverride.set(null)
			}, 100)
		}, 250)
	}

	private getInitialTheme(): Theme {
		if (!this.isBrowser) {
			return 'system'
		}

		const saved = localStorage.getItem('theme')
		if (saved === 'light' || saved === 'dark' || saved === 'system') {
			return saved
		}

		return 'system'
	}

	private saveTheme(theme: Theme): void {
		if (!this.isBrowser) {
			return
		}

		if (theme === 'system') {
			localStorage.removeItem('theme')
		} else {
			localStorage.setItem('theme', theme)
		}
	}

	private applyTheme(): void {
		if (!this.isBrowser) {
			return
		}
		const isDark = this.isDark()
		document.documentElement.classList.toggle('dark', isDark)
	}
}

import { Component, inject } from '@angular/core'
import { ThemeService } from '../services/theme.service'

@Component({
	selector: 'app-theme-toggle',
	template: `
		<button
			(click)="toggleTheme()"
			class="theme-toggle-btn flex items-center justify-center p-2 rounded-lg transition-colors duration-200
				bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700
				text-gray-800 dark:text-gray-200 relative"
			[class.hydrated]="isHydrated()"
			[attr.aria-label]="isHydrated() ? (isDark() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro') : 'Toggle tema'"
			[title]="isHydrated() ? (isDark() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro') : 'Toggle tema'"
		>
			<div class="theme-toggle-icon-ssr">
				<svg
					class="moon-icon w-5 h-5 block dark:hidden"
					fill="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
						clip-rule="evenodd"
					/>
				</svg>
				<svg
					class="sun-icon w-5 h-5 hidden dark:block"
					fill="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
					/>
				</svg>
			</div>

			@if (isHydrated()) {
				<div class="theme-toggle-icon-js">
					@if (!isDark()) {
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
								clip-rule="evenodd"
							/>
						</svg>
					}

					@if (isDark()) {
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
							/>
						</svg>
					}
				</div>
			}
		</button>
	`,
	styles: [`
		.theme-toggle-btn {
			min-width: 36px;
			min-height: 36px;
		}

		.theme-toggle-icon-ssr {
			opacity: 1;
			transition: opacity 0.1s ease-in-out;
		}

		.theme-toggle-icon-js {
			opacity: 0;
			transition: opacity 0.1s ease-in-out;
		}

		.theme-toggle-btn.hydrated .theme-toggle-icon-ssr {
			opacity: 0;
			pointer-events: none;
		}

		.theme-toggle-btn.hydrated .theme-toggle-icon-js {
			opacity: 1;
		}

		.theme-toggle-icon-ssr,
		.theme-toggle-icon-js {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	`]
})
export class ThemeToggleComponent {
	private readonly themeService = inject(ThemeService)

	readonly isDark = this.themeService.isDark
	readonly theme = this.themeService.theme
	readonly isHydrated = this.themeService.isHydrated

	toggleTheme(): void {
		this.themeService.toggleTheme()
	}
}

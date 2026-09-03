'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase/client';
import { useToast } from '../../../components/shared/ToastProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import {
	AtSign,
	ChevronLeft,
	Zap,
	Loader2,
	Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	
	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) return;
		setLoading(true);
	
		// Using mocked supabase auth
		const { error } = await supabase.auth.signInWithPassword();
	
		setLoading(false);
	
		if (error) {
			toast({
				title: 'Authentication Failed',
				description: (error as any)?.message || 'Invalid credentials. Please try again.',
				type: 'lead',
			});
			return;
		}
	
		router.push('/onboarding');
	};

	const handleGoogleSignIn = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			router.push('/onboarding');
		}, 1000);
	};

	const handleDemoLogin = () => {
		setLoading(true);
		setEmail('demo@sellq.ai');
		setPassword('Demo@2026');
		
		toast({
			type: 'system',
			title: 'Demo Mode Activated',
			description: 'Setting up your demo environment...',
		});
	
		setTimeout(() => {
			setLoading(false);
			router.push('/inbox');
		}, 1200);
	};

	return (
		<main className="relative min-h-screen md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-[#06080f] text-zinc-200">
			
			{/* LEFT PANEL */}
			<div className="relative hidden h-full flex-col border-r border-white/10 p-10 lg:flex bg-black">
				<div className="absolute inset-0 z-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
				
				<div className="relative z-20 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/25">
						<Zap size={20} className="text-white" />
					</div>
					<p className="text-2xl font-bold tracking-tight text-white font-heading">SellQ</p>
				</div>
				
				<div className="z-10 mt-auto">
					<blockquote className="space-y-4 max-w-lg">
						<p className="text-2xl font-light leading-relaxed text-zinc-300">
							&ldquo;SellQ has completely transformed our revenue engine. We score leads instantly and never miss a follow-up. It is basically magic.&rdquo;
						</p>
						<footer className="text-sm font-medium text-zinc-500 flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-zinc-800"></div>
							<div>
								<div className="text-white">Alex Chen</div>
								<div>VP of Sales, TechFlow</div>
							</div>
						</footer>
					</blockquote>
				</div>
			</div>

			{/* RIGHT PANEL */}
			<div className="relative flex min-h-screen flex-col justify-center p-6 md:p-12">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
				>
					<div className="absolute top-0 right-0 h-[800px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0,rgba(6,182,212,0.05)_50%,transparent_100%)] blur-[100px]" />
				</div>
				
				<Link href="/">
					<Button variant="ghost" className="absolute top-7 left-5 text-zinc-400 hover:text-white hover:bg-white/5">
						<ChevronLeft className='size-4 me-2' />
						Home
					</Button>
				</Link>

				<div className="mx-auto space-y-6 w-full max-w-sm">
					<div className="flex items-center gap-3 lg:hidden mb-8">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/25">
							<Zap size={20} className="text-white" />
						</div>
						<p className="text-2xl font-bold tracking-tight text-white font-heading">SellQ</p>
					</div>

					<div className="flex flex-col space-y-2">
						<h1 className="text-3xl font-bold tracking-tight text-white">
							Welcome back
						</h1>
						<p className="text-zinc-400 text-sm">
							Sign in to your intelligent workspace.
						</p>
					</div>

					{/* Demo Login Button */}
					<button
						onClick={handleDemoLogin}
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-3.5 text-sm font-bold text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-[1.02]"
					>
						<Sparkles size={16} /> ✨ Try Demo Account (No signup needed)
					</button>

					<div className="space-y-3">
						<Button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full h-11 bg-white/[0.03] border-white/10 hover:bg-white/[0.08] text-white font-medium">
							<GoogleIcon className='size-4 me-2' />
							Continue with Google
						</Button>
						<Button type="button" disabled={loading} className="w-full h-11 bg-white/[0.03] border-white/10 hover:bg-white/[0.08] text-white font-medium">
							<AppleIcon className='size-4 me-2' />
							Continue with Apple
						</Button>
					</div>

					<AuthSeparator />

					<form onSubmit={handleSignIn} className="space-y-4">
						<div className="space-y-3">
							<div className="relative h-max">
								<Input
									placeholder="Email address"
									className="peer ps-9 h-11 bg-black/50 border-white/10 focus-visible:ring-violet-500/50 text-white placeholder:text-zinc-500"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<div className="text-zinc-500 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-focus:text-violet-400 transition-colors">
									<AtSign className="size-4" aria-hidden="true" />
								</div>
							</div>
							
							<div className="relative h-max">
								<Input
									placeholder="Password"
									className="h-11 bg-black/50 border-white/10 focus-visible:ring-violet-500/50 text-white placeholder:text-zinc-500"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>

						<Button type="submit" disabled={loading} className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
							{loading ? (
								<span className="flex items-center justify-center gap-2">
									<Loader2 size={16} className="animate-spin" /> Authenticating...
								</span>
							) : (
								'Sign In'
							)}
						</Button>
					</form>
					
					<div className="mt-5 text-center text-sm text-zinc-400">
						<span>Don&apos;t have an account? </span>
						<Link href="/onboarding" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
							Create Workspace
						</Link>
					</div>
					
					<p className="text-zinc-500 text-center text-xs pt-2">
						By clicking continue, you agree to our{' '}
						<a href="#" className="hover:text-white underline underline-offset-4 transition-colors">Terms of Service</a>
						{' '}and{' '}
						<a href="#" className="hover:text-white underline underline-offset-4 transition-colors">Privacy Policy</a>.
					</p>
				</div>
			</div>

			{/* Loading Overlay for Demo */}
			<AnimatePresence>
				{loading && email === 'demo@sellq.ai' && (
					<motion.div
						key="demo-loading-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e1a]/95 backdrop-blur-md"
					>
						<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-2xl shadow-amber-500/20 mb-6 animate-bounce">
							<Zap size={40} className="text-white" />
						</div>
						<motion.h2 
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xl font-bold text-white font-heading tracking-wide"
						>
							Loading your demo environment...
						</motion.h2>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(139,92,246,${0.05 + i * 0.01})`,
		width: 0.5 + i * 0.02,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-violet-500"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.2 + path.id * 0.03}
						initial={{ pathLength: 0.3, opacity: 0.8 }}
						animate={{
							pathLength: 1,
							opacity: [0.4, 0.8, 0.4],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
		<g><path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669 C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62 c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401 c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" /></g>
	</svg>
);

const AppleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z" />
	</svg>
);

const GithubIcon = (props: React.ComponentProps<'svg'>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center my-6">
			<div className="bg-white/10 h-px w-full" />
			<span className="text-zinc-500 px-4 text-xs tracking-widest font-medium">OR</span>
			<div className="bg-white/10 h-px w-full" />
		</div>
	);
};

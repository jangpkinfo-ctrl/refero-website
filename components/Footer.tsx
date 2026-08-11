export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 mt-auto">
      <div className="container-custom text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Refero. All rights reserved.</p>
        <p className="mt-1 text-white/30 text-xs">
          Built with ❤️ for referral marketing
        </p>
      </div>
    </footer>
  )
}
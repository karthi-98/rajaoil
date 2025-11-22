// MissionStatement Section Component
// Displays the company's mission statement

export default function MissionStatement() {
  return (
    <section className="bg-gradient-to-br from-primary/70 to-primary/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Mission Statement</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20">
            <p className="text-lg text-white leading-relaxed text-center font-medium">
              Our mission is to manufacture premium edible oils through advanced cleaning, traditional extraction, and natural filtration methods—without chemicals or refining—while maintaining transparency, customer satisfaction, and consistent quality in every batch.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { study_hours, deep_work_pct, distraction_index, sleep_quality, retention_profile } = body;

    const deepWorkRatio = Number(deep_work_pct) / 100.0;

    // Neuro-cognitive algorithmic scoring engine
    let score = 35; // Base baseline score
    score += Number(study_hours) * 3.5; 
    score += deepWorkRatio * 20; 
    score -= Number(distraction_index) * 1.8; 
    score += Number(sleep_quality) * 2.2; 

    // Retention profile multiplier
    if (retention_profile === 'High-Speed') score *= 1.12;
    else if (retention_profile === 'Requires_Repetition') score *= 0.90;

    // Clamp final score between 25 and 99.5
    const finalScore = Math.min(99.5, Math.max(25, Math.round(score * 10) / 10));

    return NextResponse.json({
      score: finalScore,
      status: 'success',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process prediction' }, { status: 500 });
  }
}
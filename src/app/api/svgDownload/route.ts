import puppeteer from 'puppeteer';

export const POST = async (req: Request): Promise<Response> => {
  try {
    const { htmlContent, width, height } = await req.json();

    if (!htmlContent) {
      return new Response(
        JSON.stringify({ message: 'No HTML content provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!width || !height) {
      return new Response(
        JSON.stringify({ message: 'No width and height provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const viewportWidth = parseInt(width, 10);
    const viewportHeight = parseInt(height, 10);

    console.log('Received width:', viewportWidth);
    console.log('Received height:', viewportHeight);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: viewportWidth, height: viewportHeight });

    // Specify the area to capture (move the screenshot by 10px)
    const clip = {
      x: 10,   // Move the screenshot to the right by 10px
      y: 8,   // Move the screenshot down by 10px
      width: viewportWidth,  // Adjust width, reduce by 10px on each side
      height: viewportHeight, // Adjust height, reduce by 10px on top and bottom
    };

    const imageBuffer = await page.screenshot({ type: 'png', clip: clip });
    await browser.close();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="rendered-image.png"',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to generate image' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

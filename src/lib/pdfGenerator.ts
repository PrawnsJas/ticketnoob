import jsPDF from 'jspdf'

export async function generateFakeTicketPDF(orderData: {
  orderNumber: string
  artist: string
  date: string
  venue: string
  seats: string[]
  totalPrice: number
}) {
  const doc = new jsPDF()

  doc.setFillColor(30, 30, 50)
  doc.rect(0, 0, 210, 297, 'F')

  doc.setTextColor(255, 0, 110)
  doc.setFontSize(28)
  doc.text('TICKETNOOB', 105, 30, { align: 'center' })

  doc.setTextColor(0, 217, 255)
  doc.setFontSize(24)
  doc.text(orderData.artist, 105, 50, { align: 'center' })

  doc.setTextColor(255, 214, 10)
  doc.setFontSize(14)
  doc.text(`Order: ${orderData.orderNumber}`, 20, 80)

  doc.setTextColor(200, 200, 200)
  doc.setFontSize(12)
  doc.text(`Venue: ${orderData.venue}`, 20, 100)
  doc.text(`Date: ${orderData.date}`, 20, 112)
  doc.text(`Seats: ${orderData.seats.join(', ')}`, 20, 124)
  doc.text(`Total: ₱${orderData.totalPrice.toLocaleString()}`, 20, 136)

  doc.setTextColor(181, 0, 217)
  doc.setFontSize(10)
  doc.text('This is a simulated training ticket. Not valid for real events.', 105, 160, {
    align: 'center',
  })

  doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 170, { align: 'center' })

  doc.setDrawColor(255, 0, 110)
  doc.setLineWidth(1)
  doc.rect(10, 10, 190, 277)

  const filename = `ticket-${orderData.orderNumber}.pdf`
  doc.save(filename)
}

export function generateTicketHTML(orderData: {
  orderNumber: string
  artist: string
  date: string
  venue: string
  seats: string[]
  totalPrice: number
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #1e1e32; color: #fff; font-family: Arial; margin: 20px; }
        .ticket {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1e1e32 0%, #2a1a4d 100%);
          border: 2px solid #FF006E;
          padding: 40px;
          border-radius: 10px;
        }
        h1 { color: #FF006E; text-align: center; margin: 0 0 10px 0; }
        .artist { color: #00D9FF; font-size: 28px; text-align: center; margin: 20px 0; }
        .details { margin: 30px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { color: #FFD60A; }
        .value { color: #fff; }
        .warning { color: #FFD60A; text-align: center; margin-top: 30px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="ticket">
        <h1>TICKETNOOB</h1>
        <div class="artist">${orderData.artist}</div>
        <div class="details">
          <div class="detail-row">
            <span class="label">Order Number:</span>
            <span class="value">${orderData.orderNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">Venue:</span>
            <span class="value">${orderData.venue}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${orderData.date}</span>
          </div>
          <div class="detail-row">
            <span class="label">Seats:</span>
            <span class="value">${orderData.seats.join(', ')}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total:</span>
            <span class="value">₱${orderData.totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <div class="warning">⚠️ This is a simulated training ticket. Not valid for real events.</div>
        <div class="warning">Generated: ${new Date().toLocaleString()}</div>
      </div>
    </body>
    </html>
  `
}

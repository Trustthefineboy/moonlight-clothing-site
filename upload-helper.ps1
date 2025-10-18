#!/usr/bin/env pwsh
# Moonlight NFT Image Upload Helper
# Run this after you've chosen your hosting platform

Write-Host "🌙 Moonlight NFT Image Upload Helper" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$nftImages = @(
    @{Name="King Menes"; ID="nft-001"; Desc="Black shirt with gold Egyptian art"},
    @{Name="Mansa Musa"; ID="nft-002"; Desc="Gold/brown Mali Empire set"},
    @{Name="Yoruba Kingdom"; ID="nft-003"; Desc="Black with bronze panels, No More Debts"},
    @{Name="Osupa Ale"; ID="nft-004"; Desc="Black with ocean/moon theme, mermaids/turtles"},
    @{Name="Birds of Paradise"; ID="nft-005"; Desc="Teal with colorful birds at sunset"},
    @{Name="Adire Sacred Geometry"; ID="nft-006"; Desc="Green/gold traditional patterns"},
    @{Name="Cowrie Shell Elegance"; ID="nft-007"; Desc="Black with cowrie shell patterns"},
    @{Name="South Africa"; ID="nft-008"; Desc="Black with tribal/drum imagery"}
)

Write-Host "📋 NFT Images Checklist:" -ForegroundColor Yellow
Write-Host ""

foreach ($nft in $nftImages) {
    Write-Host "[ ] $($nft.ID) - $($nft.Name)" -ForegroundColor White
    Write-Host "    Description: $($nft.Desc)" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "🔧 Image Optimization Tips:" -ForegroundColor Green
Write-Host "1. Resize to 1200x1600px for full image" -ForegroundColor Gray
Write-Host "2. Create 400x533px thumbnails" -ForegroundColor Gray
Write-Host "3. Compress using TinyPNG.com or similar" -ForegroundColor Gray
Write-Host "4. Target <500KB file size for web" -ForegroundColor Gray
Write-Host "5. Use JPG for photos, PNG for graphics with transparency" -ForegroundColor Gray
Write-Host ""

Write-Host "🌐 Hosting Platform Options:" -ForegroundColor Magenta
Write-Host ""
Write-Host "1. ImgBB (Free, Easy, Recommended)" -ForegroundColor Cyan
Write-Host "   → https://imgbb.com" -ForegroundColor Gray
Write-Host "   → Upload → Copy 'Direct link' → Paste in nftCollectibles.js" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Cloudinary (Professional)" -ForegroundColor Cyan
Write-Host "   → https://cloudinary.com" -ForegroundColor Gray
Write-Host "   → Sign up → Upload → Get URLs" -ForegroundColor Gray
Write-Host ""
Write-Host "3. IPFS via Pinata (Blockchain Native)" -ForegroundColor Cyan
Write-Host "   → https://pinata.cloud" -ForegroundColor Gray
Write-Host "   → Upload → Get IPFS CID → Use gateway URL" -ForegroundColor Gray
Write-Host ""

Write-Host "📝 After Uploading:" -ForegroundColor Yellow
Write-Host "1. Copy each image URL" -ForegroundColor Gray
Write-Host "2. Open: src\data\nftCollectibles.js" -ForegroundColor Gray
Write-Host "3. Replace placeholder URLs with real URLs" -ForegroundColor Gray
Write-Host "4. Test in browser at http://localhost:5173/nft-gallery" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Would you like to open the ImgBB website now? (y/n)"
if ($choice -eq 'y' -or $choice -eq 'Y') {
    Start-Process "https://imgbb.com"
    Write-Host "✅ Opening ImgBB..." -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Ready to update URLs? Run this after uploading:" -ForegroundColor Cyan
Write-Host "   code src\data\nftCollectibles.js" -ForegroundColor Gray
Write-Host ""

import type { Metadata } from "next";import "./globals.css";
export const metadata:Metadata={title:"Sudoku — en siffra i taget",description:"Spela mini-sudoku eller utmana dig med 9×9. Tävla om snabbaste tiden.",icons:{icon:"/favicon.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="sv"><body>{children}</body></html>}

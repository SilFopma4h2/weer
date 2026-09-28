import SwiftUI
import UIKit

extension Color {
    init(rgb: UInt32) {
        self.init(
            .sRGB,
            red: Double((rgb >> 16) & 0xFF) / 255,
            green: Double((rgb >> 8) & 0xFF) / 255,
            blue: Double(rgb & 0xFF) / 255,
            opacity: 1
        )
    }

    static func adaptive(light: UInt32, dark: UInt32) -> Color {
        Color(uiColor: UIColor { traits in
            UIColor(
                red: CGFloat((traits.userInterfaceStyle == .dark ? dark : light) >> 16 & 0xFF) / 255,
                green: CGFloat((traits.userInterfaceStyle == .dark ? dark : light) >> 8 & 0xFF) / 255,
                blue: CGFloat((traits.userInterfaceStyle == .dark ? dark : light) & 0xFF) / 255,
                alpha: 1
            )
        })
    }
}

enum Palette {
    static let brandStart = Color.adaptive(light: 0x2E4BDA, dark: 0x6C8BFF)
    static let brandEnd = Color.adaptive(light: 0x0FA3B1, dark: 0x2DD4BF)

    static let background = Color.adaptive(light: 0xF2F5F9, dark: 0x0A0E14)
    static let surface = Color.adaptive(light: 0xFFFFFF, dark: 0x151B24)
    static let surfaceSunken = Color.adaptive(light: 0xEDF1F7, dark: 0x10151C)

    static let hairline = Color.adaptive(light: 0x1B2430, dark: 0x2A3441)

    static let temperature = Color.adaptive(light: 0xD9480F, dark: 0xFFA94D)
    static let precipitation = Color.adaptive(light: 0x2F6FED, dark: 0x6EA8FF)
    static let wind = Color.adaptive(light: 0x0B8A63, dark: 0x38D9A9)
    static let humidity = Color.adaptive(light: 0x1C6FB8, dark: 0x4DABF7)
    static let cloud = Color.adaptive(light: 0x5A6472, dark: 0x9AA5B4)
    static let alert = Color.adaptive(light: 0xC0392B, dark: 0xFF8787)

    static let brandGradient = LinearGradient(
        colors: [brandStart, brandEnd],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

enum Severity: String {
    case good, moderate, elevated, unhealthy, hazardous
    case low, medium, high, extreme

    init(token: String) {
        switch token.lowercased() {
        case "good", "laag": self = .good
        case "moderate", "matig": self = .moderate
        case "unhealthy", "verhoogd": self = .elevated
        case "hoog": self = .unhealthy
        default: self = .hazardous
        }
    }

    var foreground: Color {
        switch self {
        case .good, .low: return .adaptive(light: 0x0E7C57, dark: 0x34D399)
        case .moderate, .medium: return .adaptive(light: 0x9A6700, dark: 0xFBBF24)
        case .elevated, .high: return .adaptive(light: 0xB44A0A, dark: 0xFB923C)
        case .unhealthy: return .adaptive(light: 0xC62B2B, dark: 0xF87171)
        case .hazardous, .extreme: return .adaptive(light: 0x6D28D9, dark: 0xC084FC)
        }
    }

    var background: Color {
        switch self {
        case .good, .low: return .adaptive(light: 0xE3F7EF, dark: 0x0E2A21)
        case .moderate, .medium: return .adaptive(light: 0xFDF3D7, dark: 0x2C2410)
        case .elevated, .high: return .adaptive(light: 0xFDEADD, dark: 0x2E1B0F)
        case .unhealthy: return .adaptive(light: 0xFCE4E4, dark: 0x2E1414)
        case .hazardous, .extreme: return .adaptive(light: 0xEEE6FE, dark: 0x241636)
        }
    }

    var gradient: LinearGradient {
        LinearGradient(
            colors: [foreground.opacity(0.92), foreground],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

enum FireLevel {
    static func label(token: String) -> String {
        switch token.lowercased() {
        case "laag": return String(localized: "Low")
        case "matig": return String(localized: "Moderate")
        case "verhoogd": return String(localized: "Elevated")
        case "hoog": return String(localized: "High")
        default: return String(localized: "Extreme")
        }
    }

    static func detail(token: String) -> String {
        switch token.lowercased() {
        case "laag": return String(localized: "Low fire danger. Conditions are favourable.")
        case "matig": return String(localized: "Limited fire danger. Conditions are favourable.")
        case "verhoogd": return String(localized: "Elevated fire danger. Dry and warm conditions.")
        case "hoog": return String(localized: "High fire danger. Be careful with open flames.")
        default: return String(localized: "Extreme fire danger. Open flames strongly discouraged.")
        }
    }
}

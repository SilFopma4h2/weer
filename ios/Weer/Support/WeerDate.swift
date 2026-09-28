import Foundation

enum WeerDate {
    private static let serverTimeZone = TimeZone(identifier: "Europe/Amsterdam") ?? .current

    private static var serverCalendar: Calendar {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = serverTimeZone
        return calendar
    }

    private static let minuteFormat = "yyyy-MM-dd'T'HH:mm"
    private static let dateFormat = "yyyy-MM-dd"

    private static func formatter(_ format: String) -> DateFormatter {
        let key = "weer.formatter.\(format)"
        if let cached = Thread.current.threadDictionary[key] as? DateFormatter { return cached }
        let created = DateFormatter()
        created.locale = .current
        created.timeZone = serverTimeZone
        created.dateFormat = format
        Thread.current.threadDictionary[key] = created
        return created
    }

    private static func timeSlice(_ value: String) -> String? {
        guard let marker = value.firstIndex(of: "T") else { return nil }
        let start = value.index(after: marker)
        guard let end = value.index(start, offsetBy: 5, limitedBy: value.endIndex), end > start else { return nil }
        return String(value[start..<end])
    }

    private static func day(_ value: String) -> Date? {
        formatter(dateFormat).date(from: String(value.prefix(10)))
    }

    private static func minute(_ value: String) -> Date? {
        guard let time = timeSlice(value) else { return nil }
        return formatter(minuteFormat).date(from: String(value.prefix(10)) + "T" + time)
    }

    static func parseStamp(_ value: String) -> Date? {
        minute(value) ?? day(value)
    }

    static func clockTime(_ value: String) -> String {
        if let date = minute(value) {
            return formatter("HH:mm").string(from: date)
        }
        return timeSlice(value) ?? value
    }

    static func dayTitle(_ value: String) -> String {
        guard let date = day(value) else { return value }
        if serverCalendar.isDateInToday(date) { return String(localized: "Today") }
        if serverCalendar.isDateInTomorrow(date) { return String(localized: "Tomorrow") }
        return formatter("EEE d MMM").string(from: date)
    }

    static func dayColumn(_ value: String) -> String {
        guard let date = day(value) else { return value }
        if serverCalendar.isDateInToday(date) { return String(localized: "Today") }
        if serverCalendar.isDateInTomorrow(date) { return String(localized: "Tomorrow") }
        let horizon = serverCalendar.date(byAdding: .day, value: 6, to: Date()) ?? Date()
        if date <= horizon { return formatter("EEE").string(from: date) }
        return formatter("d MMM").string(from: date)
    }

    static func updatedStamp(_ value: String) -> String {
        guard let date = parseStamp(value) else { return value }
        return String(localized: "Updated") + " " + formatter("HH:mm").string(from: date)
    }
}

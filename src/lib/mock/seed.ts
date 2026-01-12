// Mock data generator for CMC Infrastructure Command

const WARDS = [
  "Colombo 01", "Colombo 02", "Colombo 03", "Colombo 04", "Colombo 05",
  "Colombo 06", "Colombo 07", "Colombo 08", "Colombo 09", "Colombo 10",
  "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15",
  "Bambalapitiya", "Wellawatta", "Kollupitiya", "Cinnamon Gardens", "Borella",
  "Maradana", "Pettah", "Fort", "Slave Island", "Hulftsdorf"
]

const STREET_NAMES = [
  "Galle Road", "Marine Drive", "Duplication Road", "Baseline Road", "High Level Road",
  "Kynsey Road", "Ward Place", "Horton Place", "Reid Avenue", "Cotta Road",
  "Bauddhaloka Mawatha", "Dharmapala Mawatha", "Ananda Coomaraswamy Mawatha", "Sir Marcus Fernando Mawatha"
]

const ASSET_TYPES = ["road", "drain", "streetlight", "tree", "waste", "building"] as const
export type AssetType = typeof ASSET_TYPES[number]

const CONDITION_LEVELS = ["excellent", "good", "fair", "poor", "critical"] as const
export type ConditionLevel = typeof CONDITION_LEVELS[number]

const SEVERITY_LEVELS = ["low", "medium", "high", "critical"] as const
export type SeverityLevel = typeof SEVERITY_LEVELS[number]

const STATUS_OPTIONS = ["open", "in_progress", "resolved", "closed"] as const
export type Status = typeof STATUS_OPTIONS[number]

export interface Asset {
  id: string
  type: AssetType
  name: string
  ward: string
  segment: string
  condition: ConditionLevel
  conditionScore: number
  lastInspected: string
  nextInspection: string
  riskLevel: SeverityLevel
  coordinates: { lat: number; lon: number }
  metadata: Record<string, any>
}

export interface WorkOrder {
  id: string
  assetId: string
  assetType: AssetType
  title: string
  description: string
  severity: SeverityLevel
  status: Status
  assignedCrew: string | null
  dueDate: string
  createdAt: string
  slaDeadline: string
  slaStatus: "on_time" | "at_risk" | "breached"
  materials: string[]
  cost: number
}

export interface Complaint {
  id: string
  citizenName: string
  contact: string
  category: string
  description: string
  location: string
  ward: string
  status: Status
  priority: SeverityLevel
  sentiment: "positive" | "neutral" | "negative"
  createdAt: string
  assetId: string | null
  mergedWith: string | null
}

export interface Incident {
  id: string
  type: "flood" | "blockage" | "road_damage" | "fallen_tree" | "outage_cluster"
  title: string
  description: string
  ward: string
  coordinates: { lat: number; lon: number }
  impactRadius: number
  severity: SeverityLevel
  status: Status
  reportedAt: string
  resolvedAt: string | null
  linkedWorkOrders: string[]
  linkedComplaints: string[]
}

export interface Crew {
  id: string
  name: string
  teamLead: string
  members: string[]
  equipment: string[]
  availability: "available" | "on_duty" | "off_duty"
  currentLocation: string | null
  shift: "morning" | "afternoon" | "night"
}

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

function generateAsset(type: AssetType, index: number): Asset {
  const ward = randomElement(WARDS)
  const segment = `${randomElement(STREET_NAMES)} - Segment ${randomInt(1, 50)}`
  const condition = randomElement(CONDITION_LEVELS)
  const conditionScore = condition === "excellent" ? randomInt(85, 100) :
    condition === "good" ? randomInt(70, 84) :
    condition === "fair" ? randomInt(50, 69) :
    condition === "poor" ? randomInt(30, 49) : randomInt(0, 29)
  
  const riskLevel = conditionScore < 40 ? "critical" :
    conditionScore < 60 ? "high" :
    conditionScore < 75 ? "medium" : "low"

  const now = new Date()
  const lastInspected = randomDate(new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000), now)
  const nextInspection = randomDate(now, new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000))

  const baseLat = 6.9271
  const baseLon = 79.8612
  const lat = baseLat + (Math.random() - 0.5) * 0.1
  const lon = baseLon + (Math.random() - 0.5) * 0.1

  const metadata: Record<string, any> = {}
  if (type === "road") {
    metadata.length = randomInt(50, 500)
    metadata.width = randomInt(3, 12)
    metadata.surfaceType = randomElement(["asphalt", "concrete", "gravel"])
  } else if (type === "drain") {
    metadata.length = randomInt(10, 200)
    metadata.depth = randomInt(1, 3)
    metadata.material = randomElement(["concrete", "brick", "metal"])
  } else if (type === "streetlight") {
    metadata.poleHeight = randomInt(5, 12)
    metadata.bulbType = randomElement(["LED", "CFL", "Halogen"])
    metadata.wattage = randomInt(50, 200)
  } else if (type === "tree") {
    metadata.species = randomElement(["Coconut", "Mango", "Rain Tree", "Mahogany"])
    metadata.age = randomInt(5, 50)
    metadata.height = randomInt(3, 15)
  } else if (type === "waste") {
    metadata.capacity = randomInt(100, 1000)
    metadata.collectionFrequency = randomElement(["daily", "twice_weekly", "weekly"])
  } else if (type === "building") {
    metadata.floorArea = randomInt(100, 5000)
    metadata.floors = randomInt(1, 5)
    metadata.purpose = randomElement(["office", "warehouse", "maintenance", "public"])
  }

  return {
    id: `${type}-${index.toString().padStart(6, "0")}`,
    type,
    name: `${type === "road" ? "Road" : type === "drain" ? "Drain" : type === "streetlight" ? "Streetlight" : type === "tree" ? "Tree" : type === "waste" ? "Waste Point" : "Building"} ${segment}`,
    ward,
    segment,
    condition,
    conditionScore,
    lastInspected,
    nextInspection,
    riskLevel,
    coordinates: { lat, lon },
    metadata,
  }
}

function generateWorkOrder(index: number, assets: Asset[]): WorkOrder {
  const asset = randomElement(assets)
  const severity = randomElement(SEVERITY_LEVELS)
  const status = randomElement(STATUS_OPTIONS)
  const now = new Date()
  const createdAtDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
  const createdAt = createdAtDate.toISOString()
  const dueDate = randomDate(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000))
  const slaDeadline = new Date(createdAtDate.getTime() + (severity === "critical" ? 24 : severity === "high" ? 72 : severity === "medium" ? 168 : 336) * 60 * 60 * 1000).toISOString()
  
  const slaStatus = new Date() > new Date(slaDeadline) ? "breached" :
    new Date(slaDeadline).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 ? "at_risk" : "on_time"

  const materials = []
  if (asset.type === "road") materials.push("Asphalt", "Gravel", "Sealant")
  else if (asset.type === "drain") materials.push("Concrete Pipe", "Grating")
  else if (asset.type === "streetlight") materials.push("LED Bulb", "Wiring")
  else if (asset.type === "tree") materials.push("Fertilizer", "Mulch")
  else if (asset.type === "waste") materials.push("Bin Liner", "Deodorizer")
  else materials.push("Paint", "Hardware")

  return {
    id: `wo-${index.toString().padStart(6, "0")}`,
    assetId: asset.id,
    assetType: asset.type,
    title: `${asset.type === "road" ? "Road repair" : asset.type === "drain" ? "Drain cleaning" : asset.type === "streetlight" ? "Light replacement" : asset.type === "tree" ? "Tree maintenance" : asset.type === "waste" ? "Waste collection" : "Building maintenance"} - ${asset.segment}`,
    description: `Maintenance work required for ${asset.name} in ${asset.ward}. Condition: ${asset.condition}.`,
    severity,
    status,
    assignedCrew: status !== "open" ? `crew-${randomInt(1, 50)}` : null,
    dueDate,
    createdAt,
    slaDeadline,
    slaStatus,
    materials: materials.slice(0, randomInt(1, 3)),
    cost: randomInt(5000, 500000),
  }
}

function generateComplaint(index: number, assets: Asset[]): Complaint {
  const names = ["Kamal Perera", "Nimal Silva", "Priya Fernando", "Rohan Jayasuriya", "Anjali Wickramasinghe", "Suresh Mendis", "Lakshmi De Silva", "Dilshan Karunaratne"]
  const categories = ["Road Damage", "Drain Blockage", "Streetlight Outage", "Waste Collection", "Tree Hazard", "Building Issue", "Other"]
  const ward = randomElement(WARDS)
  const asset = Math.random() > 0.3 ? randomElement(assets.filter(a => a.ward === ward)) : null
  const sentiment = randomElement(["positive", "neutral", "negative"])
  const priority = sentiment === "negative" && Math.random() > 0.5 ? "high" : randomElement(["low", "medium", "high"])
  const status = randomElement(STATUS_OPTIONS)
  const now = new Date()
  const createdAt = randomDate(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), now)

  return {
    id: `comp-${index.toString().padStart(6, "0")}`,
    citizenName: randomElement(names),
    contact: `0${randomInt(70, 77)}${randomInt(1000000, 9999999)}`,
    category: randomElement(categories),
    description: `Complaint regarding ${randomElement(categories).toLowerCase()} in ${ward}.`,
    location: `${randomElement(STREET_NAMES)}, ${ward}`,
    ward,
    status,
    priority,
    sentiment,
    createdAt,
    assetId: asset?.id || null,
    mergedWith: null,
  }
}

function generateIncident(index: number, assets: Asset[]): Incident {
  const types: Incident["type"][] = ["flood", "blockage", "road_damage", "fallen_tree", "outage_cluster"]
  const type = randomElement(types)
  const ward = randomElement(WARDS)
  const asset = randomElement(assets.filter(a => a.ward === ward))
  const severity = randomElement(SEVERITY_LEVELS)
  const status = randomElement(STATUS_OPTIONS)
  const now = new Date()
  const reportedAt = randomDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)
  const resolvedAt = status === "resolved" || status === "closed" ? randomDate(new Date(reportedAt), now) : null

  return {
    id: `inc-${index.toString().padStart(6, "0")}`,
    type,
    title: `${type === "flood" ? "Flooding" : type === "blockage" ? "Drain Blockage" : type === "road_damage" ? "Road Damage" : type === "fallen_tree" ? "Fallen Tree" : "Streetlight Outage Cluster"} - ${ward}`,
    description: `Incident reported in ${ward} affecting multiple assets.`,
    ward,
    coordinates: asset.coordinates,
    impactRadius: randomInt(50, 500),
    severity,
    status,
    reportedAt,
    resolvedAt,
    linkedWorkOrders: [],
    linkedComplaints: [],
  }
}

function generateCrew(index: number): Crew {
  const names = ["Team Alpha", "Team Beta", "Team Gamma", "Team Delta", "Maintenance Unit 1", "Maintenance Unit 2", "Emergency Response", "Night Shift Team"]
  const leads = ["Nimal Perera", "Kamal Silva", "Priya Fernando", "Rohan Jayasuriya", "Anjali Wickramasinghe", "Suresh Mendis"]
  const members = ["Member 1", "Member 2", "Member 3", "Member 4"]
  const equipment = ["Truck", "Tools", "Safety Gear", "Communication"]
  const availability = randomElement(["available", "on_duty", "off_duty"])
  const shift = randomElement(["morning", "afternoon", "night"])

  return {
    id: `crew-${index.toString().padStart(3, "0")}`,
    name: randomElement(names),
    teamLead: randomElement(leads),
    members: members.slice(0, randomInt(2, 4)),
    equipment: equipment.slice(0, randomInt(2, 4)),
    availability,
    currentLocation: availability === "on_duty" ? randomElement(WARDS) : null,
    shift,
  }
}

export function generateMockData() {
  const assets: Asset[] = []
  const workOrders: WorkOrder[] = []
  const complaints: Complaint[] = []
  const incidents: Incident[] = []
  const crews: Crew[] = []

  // Generate assets
  ASSET_TYPES.forEach(type => {
    const count = type === "road" ? 300 : type === "drain" ? 250 : type === "streetlight" ? 200 : type === "tree" ? 150 : type === "waste" ? 100 : 50
    for (let i = 0; i < count; i++) {
      assets.push(generateAsset(type, assets.length + 1))
    }
  })

  // Generate work orders
  for (let i = 0; i < 500; i++) {
    workOrders.push(generateWorkOrder(i + 1, assets))
  }

  // Generate complaints
  for (let i = 0; i < 2000; i++) {
    complaints.push(generateComplaint(i + 1, assets))
  }

  // Generate incidents
  for (let i = 0; i < 200; i++) {
    incidents.push(generateIncident(i + 1, assets))
  }

  // Generate crews
  for (let i = 0; i < 50; i++) {
    crews.push(generateCrew(i + 1))
  }

  return {
    assets,
    workOrders,
    complaints,
    incidents,
    crews,
    wards: WARDS,
  }
}

export const mockData = generateMockData()


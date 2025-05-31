import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import InfluencerCard from "@/components/discovery/InfluencerCard";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
import AIRecommendations from "@/components/discovery/AIRecommendations";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCampaignInfluencers, setShowCampaignInfluencers] = useState(false);

  // Sample campaigns data
  const campaigns = [
    { id: "1", name: "Spring Wellness Push" },
    { id: "2", name: "Summer Fashion Campaign" },
    { id: "3", name: "Tech Review Series" }
  ];

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      bio: "Fashion enthusiast & lifestyle creator passionate about sustainable fashion and wellness",
      location: "New York, NY",
      image: "/api/placeholder/64/64",
      totalFollowers: "659K",
      avgEngagement: "3.8%",
      languages: ["English", "Spanish"],
      rating: 4.8,
      niches: ["Fashion", "Lifestyle", "Wellness"],
      campaignName: "Spring Wellness Push", // Added to campaign
      platforms: [
        {
          name: "instagram",
          handle: "@sarahjohnson",
          followers: "125K",
          engagement: "3.2%",
          verified: true,
          topBrand: "Nike"
        },
        {
          name: "youtube",
          handle: "Sarah Johnson Fashion",
          followers: "289K",
          engagement: "4.1%",
          verified: false,
          topBrand: "Sephora"
        },
        {
          name: "twitter",
          handle: "@sarah_j_fashion",
          followers: "45K",
          engagement: "2.8%",
          verified: false,
          topBrand: null
        },
        {
          name: "tiktok",
          handle: "@sarahjohnsonofficial",
          followers: "200K",
          engagement: "5.2%",
          verified: true,
          topBrand: "Zara"
        }
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      bio: "Tech reviewer & software engineer sharing the latest in consumer technology",
      location: "San Francisco, CA",
      image: "/api/placeholder/64/64",
      totalFollowers: "423K",
      avgEngagement: "4.2%",
      languages: ["English", "Mandarin"],
      rating: 4.6,
      niches: ["Tech", "Gaming", "Reviews"],
      campaignName: "Tech Review Series", // Added to campaign
      platforms: [
        {
          name: "youtube",
          handle: "Mike Chen Tech",
          followers: "189K",
          engagement: "4.5%",
          verified: true,
          topBrand: "Apple"
        },
        {
          name: "twitter",
          handle: "@mikechen_tech",
          followers: "156K",
          engagement: "3.8%",
          verified: true,
          topBrand: "Samsung"
        },
        {
          name: "linkedin",
          handle: "mike-chen-tech",
          followers: "78K",
          engagement: "4.3%",
          verified: false,
          topBrand: "Microsoft"
        }
      ]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      bio: "Lifestyle blogger & wellness coach helping people live their best life",
      location: "Los Angeles, CA",
      image: "/api/placeholder/64/64",
      totalFollowers: "912K",
      avgEngagement: "3.5%",
      languages: ["English", "Portuguese"],
      rating: 4.9,
      niches: ["Lifestyle", "Wellness", "Travel"],
      // No campaignName - not added to any campaign
      platforms: [
        {
          name: "instagram",
          handle: "@emmarodriguez",
          followers: "200K",
          engagement: "2.8%",
          verified: true,
          topBrand: "Lululemon"
        },
        {
          name: "youtube",
          handle: "Emma Rodriguez Lifestyle",
          followers: "167K",
          engagement: "3.9%",
          verified: true,
          topBrand: "Headspace"
        },
        {
          name: "tiktok",
          handle: "@emmarodriguezlife",
          followers: "450K",
          engagement: "4.1%",
          verified: true,
          topBrand: "Alo Yoga"
        },
        {
          name: "twitter",
          handle: "@emma_lifestyle",
          followers: "95K",
          engagement: "2.3%",
          verified: false,
          topBrand: null
        }
      ]
    },
  ];

  // Filter influencers based on current filter settings
  const filteredInfluencers = influencers.filter((influencer) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        influencer.name.toLowerCase().includes(query) ||
        influencer.niches.some(niche => niche.toLowerCase().includes(query)) ||
        influencer.platforms.some(platform => platform.handle.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Campaign toggle filter
    if (showCampaignInfluencers && !influencer.campaignName) {
      return false;
    }

    return true;
  });

  return (
    <CampaignLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Influencer Discovery
            </h1>
            <p className="text-gray-600">
              Find and add influencers to your campaign
            </p>
          </div>
        </div>

        {/* Search, Filters, and Toggle */}
        <DiscoveryFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCampaignInfluencers={showCampaignInfluencers}
          onToggleChange={setShowCampaignInfluencers}
        />

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>

        {/* No results message */}
        {filteredInfluencers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No influencers found matching your criteria.</p>
          </div>
        )}

        {/* AI Suggestions */}
        <AIRecommendations />
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;

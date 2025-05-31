
import { useState } from "react";
import CampaignLayout from "@/components/layout/CampaignLayout";
import AgentPanel from "@/components/agents/AgentPanel";
import InfluencerCard from "@/components/discovery/InfluencerCard";
import InfluencerFilters from "@/components/discovery/InfluencerFilters";
import AIRecommendations from "@/components/discovery/AIRecommendations";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Search and Filters */}
        <InfluencerFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>

        {/* AI Suggestions */}
        <AIRecommendations />
      </div>

      {/* Agent Panel */}
      <AgentPanel agentName="Discovery Agent" agentType="discovery" />
    </CampaignLayout>
  );
};

export default Discovery;

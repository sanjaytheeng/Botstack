"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  VideoIcon,
  BotIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const trpc = useTRPC();
  const router = useRouter();

  // Fetch overview data
  const { data: agentsData } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 5 })
  );
  const { data: meetingsData } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ pageSize: 5 })
  );
  const { data: freeUsage } = useSuspenseQuery(
    trpc.premium.getFreeUsage.queryOptions()
  );

  const totalAgents = agentsData.total;
  const totalMeetings = meetingsData.total;
  const recentAgents = agentsData.items.slice(0, 3);
  const recentMeetings = meetingsData.items.slice(0, 3);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Botstack
        </h1>
        <p className="text-muted-foreground">
          Manage your AI agents and meetings from your dashboard.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <BotIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              AI assistants created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Meetings
            </CardTitle>
            <VideoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMeetings}</div>
            <p className="text-xs text-muted-foreground">Sessions conducted</p>
          </CardContent>
        </Card>

        {freeUsage && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Free Agents
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(0, 3 - freeUsage.agentCount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Remaining in free tier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Free Meetings
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(0, 5 - freeUsage.meetingCount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Remaining in free tier
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href="/agents">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Agent
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/meetings">
            <PlusIcon className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Link>
        </Button>
      </div>

      {/* Recent Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Agents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAgents.length > 0 ? (
              recentAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => router.push(`/agents/${agent.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <BotIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {agent.meetingCount} meetings
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No agents created yet
              </p>
            )}
            {totalAgents > 3 && (
              <Button variant="outline" asChild className="w-full">
                <Link href="/agents">View All Agents</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMeetings.length > 0 ? (
              recentMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => router.push(`/meetings/${meeting.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <VideoIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{meeting.name}</p>
                      <p className="text-sm text-muted-foreground">
                        with {meeting.agents.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">
                      {meeting.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No meetings scheduled yet
              </p>
            )}
            {totalMeetings > 3 && (
              <Button variant="outline" asChild className="w-full">
                <Link href="/meetings">View All Meetings</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
